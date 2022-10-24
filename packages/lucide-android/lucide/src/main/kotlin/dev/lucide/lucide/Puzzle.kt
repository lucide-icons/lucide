package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Puzzle: ImageVector
    get() {
        if (_puzzle != null) {
            return _puzzle!!
        }
        _puzzle = Builder(name = "Puzzle", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(19.439f, 7.85f)
                curveToRelative(-0.049f, 0.322f, 0.059f, 0.648f, 0.289f, 0.878f)
                lineToRelative(1.568f, 1.568f)
                curveToRelative(0.47f, 0.47f, 0.706f, 1.087f, 0.706f, 1.704f)
                reflectiveCurveToRelative(-0.235f, 1.233f, -0.706f, 1.704f)
                lineToRelative(-1.611f, 1.611f)
                arcToRelative(0.98f, 0.98f, 0.0f, false, true, -0.837f, 0.276f)
                curveToRelative(-0.47f, -0.07f, -0.802f, -0.48f, -0.968f, -0.925f)
                arcToRelative(2.501f, 2.501f, 0.0f, true, false, -3.214f, 3.214f)
                curveToRelative(0.446f, 0.166f, 0.855f, 0.497f, 0.925f, 0.968f)
                arcToRelative(0.979f, 0.979f, 0.0f, false, true, -0.276f, 0.837f)
                lineToRelative(-1.61f, 1.61f)
                arcToRelative(2.404f, 2.404f, 0.0f, false, true, -1.705f, 0.707f)
                arcToRelative(2.402f, 2.402f, 0.0f, false, true, -1.704f, -0.706f)
                lineToRelative(-1.568f, -1.568f)
                arcToRelative(1.026f, 1.026f, 0.0f, false, false, -0.877f, -0.29f)
                curveToRelative(-0.493f, 0.074f, -0.84f, 0.504f, -1.02f, 0.968f)
                arcToRelative(2.5f, 2.5f, 0.0f, true, true, -3.237f, -3.237f)
                curveToRelative(0.464f, -0.18f, 0.894f, -0.527f, 0.967f, -1.02f)
                arcToRelative(1.026f, 1.026f, 0.0f, false, false, -0.289f, -0.877f)
                lineToRelative(-1.568f, -1.568f)
                arcTo(2.402f, 2.402f, 0.0f, false, true, 1.998f, 12.0f)
                curveToRelative(0.0f, -0.617f, 0.236f, -1.234f, 0.706f, -1.704f)
                lineTo(4.23f, 8.77f)
                curveToRelative(0.24f, -0.24f, 0.581f, -0.353f, 0.917f, -0.303f)
                curveToRelative(0.515f, 0.077f, 0.877f, 0.528f, 1.073f, 1.01f)
                arcToRelative(2.5f, 2.5f, 0.0f, true, false, 3.259f, -3.259f)
                curveToRelative(-0.482f, -0.196f, -0.933f, -0.558f, -1.01f, -1.073f)
                curveToRelative(-0.05f, -0.336f, 0.062f, -0.676f, 0.303f, -0.917f)
                lineToRelative(1.525f, -1.525f)
                arcTo(2.402f, 2.402f, 0.0f, false, true, 12.0f, 1.998f)
                curveToRelative(0.617f, 0.0f, 1.234f, 0.236f, 1.704f, 0.706f)
                lineToRelative(1.568f, 1.568f)
                curveToRelative(0.23f, 0.23f, 0.556f, 0.338f, 0.877f, 0.29f)
                curveToRelative(0.493f, -0.074f, 0.84f, -0.504f, 1.02f, -0.968f)
                arcToRelative(2.5f, 2.5f, 0.0f, true, true, 3.237f, 3.237f)
                curveToRelative(-0.464f, 0.18f, -0.894f, 0.527f, -0.967f, 1.02f)
                close()
            }
        }
        .build()
        return _puzzle!!
    }

private var _puzzle: ImageVector? = null
