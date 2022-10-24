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

public val Lucide.Axe: ImageVector
    get() {
        if (_axe != null) {
            return _axe!!
        }
        _axe = Builder(name = "Axe", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp, viewportWidth
                = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(14.0f, 12.0f)
                lineToRelative(-8.501f, 8.501f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, true, -2.998f, 0.0f)
                horizontalLineToRelative(-0.002f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, true, 0.0f, -2.998f)
                lineTo(11.0f, 9.002f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(9.0f, 7.0f)
                lineToRelative(4.0f, -4.0f)
                lineToRelative(6.0f, 6.0f)
                horizontalLineToRelative(3.0f)
                lineToRelative(-0.13f, 0.648f)
                arcToRelative(7.648f, 7.648f, 0.0f, false, true, -5.081f, 5.756f)
                lineTo(15.0f, 16.0f)
                verticalLineToRelative(-3.0f)
                close()
            }
        }
        .build()
        return _axe!!
    }

private var _axe: ImageVector? = null
