package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.HeartCrack: ImageVector
    get() {
        if (_heartCrack != null) {
            return _heartCrack!!
        }
        _heartCrack = Builder(name = "HeartCrack", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(20.42f, 4.58f)
                arcToRelative(5.4f, 5.4f, 0.0f, false, false, -7.65f, 0.0f)
                lineToRelative(-0.77f, 0.78f)
                lineToRelative(-0.77f, -0.78f)
                arcToRelative(5.4f, 5.4f, 0.0f, false, false, -7.65f, 0.0f)
                curveTo(1.46f, 6.7f, 1.33f, 10.28f, 4.0f, 13.0f)
                lineToRelative(8.0f, 8.0f)
                lineToRelative(8.0f, -8.0f)
                curveToRelative(2.67f, -2.72f, 2.54f, -6.3f, 0.42f, -8.42f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(12.0f, 13.0f)
                lineToRelative(-1.0f, -1.0f)
                lineToRelative(2.0f, -2.0f)
                lineToRelative(-3.0f, -2.5f)
                lineToRelative(2.77f, -2.92f)
            }
        }
        .build()
        return _heartCrack!!
    }

private var _heartCrack: ImageVector? = null
